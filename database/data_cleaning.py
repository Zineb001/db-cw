import csv

input_file_path = '/Users/zineb/Downloads/MovieGenre.csv'
cleaned_file_path = '/Users/zineb/Downloads/MovieGenre_cleaned.csv'

def clean_csv(input_file_path, cleaned_file_path):
    with open(input_file_path, 'r', encoding='utf-8', errors='replace') as infile, \
         open(cleaned_file_path, 'w', encoding='utf-8') as outfile:
        
        reader = csv.reader(infile)
        writer = csv.writer(outfile)
        
        for row in reader:
            cleaned_row = [cell for cell in row]
            writer.writerow(cleaned_row)

if __name__ == '__main__':
    clean_csv(input_file_path, cleaned_file_path)
    print(f"Cleaned file saved to {cleaned_file_path}")

