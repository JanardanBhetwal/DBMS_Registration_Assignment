## How to Run the Project

These instructions assume you have Git and Node.js installed on your system.

1. **Clone the repository:**

```bash
git clone https://github.com/JanardanBhetwal/DBMS_Registration_Assignment.git
```

### For MacOS/Linux

```bash
cd DBMS_Registration_Assignment
cd backend
python3 -m venv myenv
source myenv/bin/activate
```

### Forwindows

```bash
cd DB
cd backend
python -m venv myenv
myenv\Scripts\activate
```

2. **Backend**

```bash
pip install -r requirements.txt
python manage.py runserver
```

3. **Frontend**
   (In a new terminal session) Navigate to the frontend directory and install dependencies:

````bash
cd ..
cd frontend
npm install
npm run dev```
````
