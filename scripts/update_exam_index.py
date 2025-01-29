#!/usr/bin/env python3
import os
import json
import re
from datetime import datetime

def extract_subject(folder_name):
	"""Extract subject name from folder (e.g., 'FP9_dansk' -> 'Dansk')"""
	subject = folder_name.replace('FP9_', '')
	return subject.capitalize()

def extract_exam_info(folder_name):
	"""Extract exam info from folder name (e.g., '2023-05-02_Skriftlig_Fremstilling')"""
	date, *name_parts = folder_name.split('_')
	return {
		'date': date,
		'name': ' '.join(name_parts)
	}

def scan_exams(proever_dir):
	"""Scan the proever directory and generate exam data"""
	exam_data = {}
	
	# Find all FP9_* directories
	for item in os.listdir(proever_dir):
		if item.startswith('FP9_') and os.path.isdir(os.path.join(proever_dir, item)):
			subject = extract_subject(item)
			exam_data[subject] = []
			
			# Scan exam directories within subject directory
			subject_dir = os.path.join(proever_dir, item)
			for exam_dir in os.listdir(subject_dir):
				if re.match(r'^\d{4}-\d{2}-\d{2}_', exam_dir):
					exam_info = extract_exam_info(exam_dir)
					exam_data[subject].append({
						'name': exam_info['name'],
						'date': exam_info['date'],
						'path': f'proever/{item}/{exam_dir}/index.html'
					})
			
			# Sort exams by date
			if exam_data[subject]:
				exam_data[subject].sort(key=lambda x: x['date'], reverse=True)
	
	return exam_data

def main():
	script_dir = os.path.dirname(os.path.abspath(__file__))
	proever_dir = os.path.join(script_dir, '..', 'docs', 'proever')
	output_file = os.path.join(proever_dir, 'exam-index.json')
	
	exam_data = scan_exams(proever_dir)
	
	with open(output_file, 'w', encoding='utf-8') as f:
		json.dump(exam_data, f, indent=2, ensure_ascii=False)
	
	print(f"Updated {output_file}")

if __name__ == '__main__':
	main()