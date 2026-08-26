from uao_growth.scoring import score_person, title_score


def test_cio_is_exportable():
    score = score_person(title="Chief Investment Officer", org_type="swf")
    assert score.seniority >= 96
    assert score.exportable
    assert score.tier == "cio"


def test_finance_minister_outranks_cio():
    minister = title_score("Minister of Finance")
    cio = title_score("Chief Investment Officer")
    assert minister[0] > cio[0]


def test_analyst_is_rejected():
    score = score_person(title="Investment Analyst", org_type="pension")
    assert score.seniority == 0
    assert score.tier == "reject"
    assert not score.exportable


def test_assistant_never_exports_even_at_a_swf():
    score = score_person(title="Executive Assistant to the CIO", org_type="swf")
    assert not score.exportable


def test_sec_owner_filter_drops_retail_wealth_managers():
    from uao_growth.sources.sec_edgar import is_owner_filer

    assert is_owner_filer("Institute for Wealth Management, LLC", "swf") is False
    assert is_owner_filer("California Public Employees Retirement System", "pension") is True
    assert is_owner_filer("Alaska Permanent Fund Corporation", "swf") is True
    assert is_owner_filer("Dye Family Office", "family_office") is True


def test_head_of_private_markets_clears_bar():
    score = score_person(title="Head of Private Markets", org_type="pension", min_seniority=78)
    assert score.exportable
    assert score.fit >= 70
