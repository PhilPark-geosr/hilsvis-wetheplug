import sys
import csv
import os
import shutil

mapping_dict = dict()
with open('../info/shapefiles_to_db_mapping_table.csv', 'r', encoding='euc-kr') as f:
    reader = csv.reader(f)
    for i , line in enumerate(reader):
        if i == 0: #첫줄 스킵(이유 : 헤더정보)
            continue
        filename, _, _, newname = line
        filename = filename.split('.')[0]
        mapping_dict[filename] = newname

print(mapping_dict)

# if you change path, check this
folder_path = "../shp_temp/"
new_path = "../shp/"

flist = os.listdir(folder_path)
for fname in flist:
    # 파일 명, 포맷
    fname2 = fname.split('.')[0]
    format = fname.split('.')[1]
    # print(fname)
    if fname2 in mapping_dict:
        # 모든 파일 옮기기
        shutil.copy(f"{folder_path + fname2}.{format}", f"{new_path + mapping_dict[fname2]}.{format}")
        
       
        