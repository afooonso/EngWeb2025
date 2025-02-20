import json

def rename_keys(obj):
    if isinstance(obj, dict):
        return {('text' if key == '#text' else key): rename_keys(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [rename_keys(item) for item in obj]
    else:
        return obj

file_path = 'db.json'

with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

data = rename_keys(data)

with open(file_path, 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

print("As chaves '#text' foram renomeadas para 'text' no arquivo db.json.")
