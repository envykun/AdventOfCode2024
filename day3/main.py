import re

pattern = r"mul\((\d+),(\d+)\)"

def mul(x, y):
    return x*y

with open('./day3/input.txt') as data:
    text = data.read()

    # part 1
    matches_1 = re.findall(pattern, text)
    matches_1 = [(int(x), int(y)) for x, y in matches_1]
    result_1 = sum([(x * y) for x, y in matches_1])
    print(result_1)

    # part 2
    collect_mul = True
    control_pattern = r"don't\(\)|do\(\)"
    matches_2 = []

    for part in re.split(f"({control_pattern})", text):
        if part == "don't()":
            collect_mul = False
        elif part == "do()":
            collect_mul = True
        elif collect_mul:
            matches_2.extend(re.findall(pattern, part))

    matches_2 = [(int(x), int(y)) for x, y in matches_2]
    result_2 = sum([(x * y) for x, y in matches_2])
    print(result_2)