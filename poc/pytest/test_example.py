def add(a, b):
    return a + b

def test_addition():
    assert add(2, 3) == 5

def test_negative_numbers():
    assert add(-1, -1) == -2
    assert add(-5, 5) == 0
