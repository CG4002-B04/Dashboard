# Delete first occurence of .
filepath = "raw_data2.txt"
with open(filepath) as fp:
  lines = fp.read().splitlines()
with open(filepath, "w") as fp:
  for line in lines:
    line = line.replace(".", "", 1)  
    print(line, file=fp)