import os

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old_str, new_str in replacements.items():
        content = content.replace(old_str, new_str)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Update profile
replace_in_file(r'KarmAI Mobile App Design\src\app\types\profile.ts', {
    '"Deepak Walia"': '"Priya Raut"',
    '"Computer Engineering"': '"Design + Tech"'
})

# Update HomeScreen 
replace_in_file(r'KarmAI Mobile App Design\src\app\components\HomeScreen.tsx', {
    'DW': 'PR',
    'Deepak': 'Priya'
})

print("Identity updated to Priya!")
