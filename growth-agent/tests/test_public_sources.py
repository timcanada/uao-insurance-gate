from pathlib import Path

from uao_growth.export.csv_export import export_named_inventory
from uao_growth.scoring import score_person
from uao_growth.sources.sec_edgar import clean_filer_name, parse_13f_signature
from uao_growth.sources.wikipedia import ministers_from_wikitext, orgs_from_list_wikitext, people_from_infobox
from uao_growth.store import Store

FIXTURE = Path(__file__).parent / "fixtures"


def test_13f_signature_parses_name_and_skips_phone():
    xml = (FIXTURE / "13f_primary_doc.xml").read_text(encoding="utf-8")
    parsed = parse_13f_signature(xml)
    assert parsed["name"] == "Margaret Andriola"
    assert parsed["title"] == "Chief Financial Officer"
    assert parsed["org_name"] == "NEW YORK STATE TEACHERS RETIREMENT SYSTEM"
    assert "518" not in parsed.values()


def test_clean_filer_name_strips_cik():
    assert (
        clean_filer_name("CALIFORNIA PUBLIC EMPLOYEES RETIREMENT SYSTEM  (CIK 0000919079)")
        == "CALIFORNIA PUBLIC EMPLOYEES RETIREMENT SYSTEM"
    )


def test_wikipedia_infobox_key_people_and_chiefs():
    calpers = """
{{Infobox
| chief1_name = Marcie Frost
| chief1_position = CEO
| chief2_name = Henry Jones
| chief2_position = Board President
}}
"""
    people = people_from_infobox(calpers, org_name="CalPERS", org_type="pension", country="US")
    names = {row["name"]: row["title"] for row in people}
    assert names["Marcie Frost"] == "Chief Executive Officer"
    assert "Henry Jones" in names

    otpp = """
{{Infobox company
| key_people          = {{ubl | Jo Taylor ([[Chief executive officer|CEO]])}}
}}
"""
    people = people_from_infobox(otpp, org_name="Ontario Teachers' Pension Plan", org_type="pension", country="CA")
    assert people[0]["name"] == "Jo Taylor"
    assert people[0]["title"] == "Chief Executive Officer"
    assert people[0]["source"] == "wikipedia"

    gic = """
{{Infobox
| key_people = [[Lee Hsien Loong]] ([[chairman]])<br />Lim Chow Kiat ([[Chief executive officer|CEO]])
}}
"""
    people = people_from_infobox(gic, org_name="GIC Private Limited", org_type="swf", country="SG")
    names = {row["name"]: row["title"] for row in people}
    assert names["Lee Hsien Loong"] == "Chairperson"
    assert names["Lim Chow Kiat"] == "Chief Executive Officer"
    assert not any("[[" in row["name"] for row in people)

    pif = """
{{Infobox
| key_people = {{Unbulleted_list|[[Mohammed bin Salman]], Chairman  |[[Yasir Al-Rumayyan]], Governor}}
}}
"""
    people = people_from_infobox(pif, org_name="Public Investment Fund", org_type="swf", country="SA")
    names = {row["name"]: row["title"] for row in people}
    assert names["Mohammed bin Salman"] == "Chairperson"
    assert names["Yasir Al-Rumayyan"] == "Governor"

    nzsuper = """
{{Infobox
| key_people = Nicola Willis - Minister of Finance | Stephen Gilmore - Chief Investment Officer
}}
"""
    people = people_from_infobox(nzsuper, org_name="New Zealand Superannuation Fund", org_type="swf", country="NZ")
    names = {row["name"]: row["title"] for row in people}
    assert names["Nicola Willis"] == "Minister of Finance"
    assert names["Stephen Gilmore"] == "Chief Investment Officer"


def test_wikipedia_minister_table_skips_list_links():
    wikitext = """
{| class="wikitable"
|-
| {{flag|Canada}}
| [[Minister of Finance (Canada)|List]]
| [[François-Philippe Champagne]]
| {{party name with color|Liberal Party of Canada}}
|-
| {{flag|Australia}}
| [[Treasurer of Australia|List]]
| [[Jim Chalmers]]
| {{party name with color|Australian Labor Party}}
|-
| {{flag|China}}
| [[Minister of Finance (China)|List]]
| {{Sortname|Lan|Fo'an}}
| {{party name with color|Chinese Communist Party}}
|-
| {{flag|Algeria}}
| [[Ministry of Finance (Algeria)|List]]
| {{Interlanguage link|Abdelkrim Bouzred|fr}}
|}
"""
    people = ministers_from_wikitext(wikitext)
    names = {row["name"]: row["country"] for row in people}
    assert names["François-Philippe Champagne"] == "Canada"
    assert names["Jim Chalmers"] == "Australia"
    assert names["Lan Fo'an"] == "China"
    assert names["Abdelkrim Bouzred"] == "Algeria"
    assert all(row["title"].startswith("Minister of Finance") for row in people)
    assert "Minister of Finance (Canada)" not in names


def test_export_named_inventory_does_not_consume_rows(tmp_path):
    store = Store(tmp_path / "t.db")
    store.insert_person(
        {
            "name": "Jo Taylor",
            "title": "Chief Executive Officer",
            "org_name": "Ontario Teachers' Pension Plan",
            "source": "wikipedia",
            "status": "exported",
            "seniority": 95,
        }
    )
    store.insert_person(
        {
            "name": "Marcie Frost",
            "title": "Chief Executive Officer",
            "org_name": "CalPERS",
            "source": "wikipedia",
            "status": "exportable",
            "seniority": 95,
        }
    )
    out = tmp_path / "inventory.csv"
    result = export_named_inventory(store, out, 50)
    assert result["exported"] == 2
    assert result["marked_exported"] == 0
    text = out.read_text(encoding="utf-8")
    assert "Jo Taylor" in text
    assert "Marcie Frost" in text
    statuses = {r["name"]: r["status"] for r in store.fetchall("SELECT name, status FROM people")}
    assert statuses["Jo Taylor"] == "exported"
    assert statuses["Marcie Frost"] == "exportable"


def test_president_title_clears_seniority_floor():
    score = score_person(title="President", org_type="pe")
    assert score.exportable
    assert score.seniority >= 78


def test_wikipedia_org_list_extracts_fund_names():
    wikitext = """
{| class="wikitable"
| [[Norway]] || [[Government Pension Fund of Norway]]
| [[Abu Dhabi Investment Authority]]
| [[List of sovereign wealth funds]]
|}
"""
    orgs = orgs_from_list_wikitext(wikitext, "swf", "List of sovereign wealth funds")
    names = {org["name"] for org in orgs}
    assert "Government Pension Fund of Norway" in names
    assert "Abu Dhabi Investment Authority" in names
    assert "List of sovereign wealth funds" not in names
