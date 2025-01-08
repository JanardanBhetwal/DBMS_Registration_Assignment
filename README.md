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

### For windows

```bash
cd DB
cd backend
python -m venv myenv
myenv\Scripts\activate
```

2. **Database**

Open settings.py in Registration/backend/backend.

```bash
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'registration',
        'USER': 'root',
        'PASSWORD': 'password',
        'HOST': 'localhost',  # Use '127.0.0.1' if 'localhost' doesn't work
        'PORT': '3306',       # Default MySQL port
    }
}
```

Replace root with your mysql username and password with mysql password.

Open a query tab in mysql, copy the content of db.sql and paste it then execute.

3. **Backend**

```bash
pip install -r requirements.txt
python manage.py runserver
```

4. **Frontend**
   (In a new terminal session) Navigate to the frontend directory and install dependencies:

````bash
cd ..
cd frontend
npm install
npm run dev```
````
