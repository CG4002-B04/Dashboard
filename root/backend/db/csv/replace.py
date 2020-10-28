# Replace the numbering of the dancers
filepath = "raw_data2.txt"
with open(filepath) as fp:
  lines = fp.read().splitlines()
with open(filepath, "w") as fp:
  for line in lines:
    splitLine = line.split("|")
    if splitLine[1] == '2':
      line = line.replace("2", "3", 1)
    elif splitLine[1] == '1':
      line = line.replace("1", "2", 1)
    elif splitLine[1] == '0':
      line = line.replace("0", "1", 1)
    print(line, file=fp)