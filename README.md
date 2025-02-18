# Eksamensarkiv 📚

A modern web-based archive system for Danish FP9 (9th grade) examination materials. Access, browse, and view past examinations in an organized and user-friendly interface.

## Features

- 📝 Browse FP9 examination materials by subject
- 📱 Responsive design for all devices
- 🇩🇰 Danish language interface
- 🔍 Easy navigation through exam content
- 💾 Organized archive structure

## Subjects

The system is structured to support examination materials for all subjects in FP9 and FP10

## Technology

<img src="https://up.shx.gg/6_fNnXp1C.png" alt="Technology Diagram" width="50%">

## Development

To run the project locally:

1. Clone the repository
2. Navigate to the `docs` directory
3. Serve the files using any static file server

## Links

- [Live Site](https://eksamen.edbpede.net)
- [Prøvebanken](https://www.prøvebanken.dk)

## Adding New Exams

Exams should be added to their respective subject folders following these naming conventions:

### Danish (FP9_dansk)

Format: `YYYY-MM-DD_Skriftlig_Fremstilling`
Example: `2023-05-02_Skriftlig_Fremstilling`

### English (FP9_engelsk)

Format: `YYYY-MM-DD_Reading_Test`
Example: `2024-01-15_Reading_Test`

### Mathematics (FP9_matematik)

Format: `YYYY-MM-DD_Med_Hjaelpemidler`
Example: `2023-12-04_Med_Hjaelpemidler`

### Folder Structure

Place exam files in:

- `/docs/proever/FP9_dansk/` for Danish exams
- `/docs/proever/FP9_engelsk/` for English exams
- `/docs/proever/FP9_matematik/` for Mathematics exams

Each exam folder should contain:

1. An `index.html` file as the main entry point
2. Any additional resources (PDFs, images, etc.) referenced by the exam
3. Subject-specific assets in their respective folders

The system uses `exam-start.html` from the shared folder as a standard entry point for all exams, which will redirect to the specific exam content when started.

### File Requirements

- All exam content should be web-compatible (HTML, PDF, images)
- Use relative paths for all resource references
- Ensure all file names use lowercase letters and hyphens for spaces
- Include any necessary subject-specific instructions in the exam folder

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

- Website code is licensed under [AGPLv3](https://www.gnu.org/licenses/agpl-3.0.html)

  [![GNU AGPLv3 Image](https://www.gnu.org/graphics/agplv3-155x51.png)](https://www.gnu.org/licenses/agpl-3.0.en.html)

- Exam content © Børne- og Undervisningsministeriet
