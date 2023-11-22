

## Setup

### Offline Setup
1. **Clone this repository:**
    ```bash
    git clone <repository_url>
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Update form data:**
    - Modify the `/helpers/formHelper` file with your desired form data.

4. **Run the application:**
    ```bash
    node index.js
    ```

### Docker Setup
1. **Build the Docker image:**
    ```bash
    docker build -t auto-form-filler.
    ```

2. **Run the Docker container:**
    ```bash
    docker run -it auto-form-filler
    ```

## Usage

### Offline Usage
- Modify the `/helpers/formHelper` file with your desired form data.
- Run the application using `node index.js`.

### Docker Usage
- Build the Docker image using `docker build`.
- Run the Docker container with `docker run`.

## Troubleshooting
- If facing issues with form submission:
    - Check Docker environment alignment with the local setup.
    - Review browser versions and Puppeteer compatibility.
    - Inspect error logs for specific error messages.
