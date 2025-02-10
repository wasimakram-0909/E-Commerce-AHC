## Project info

- This project has a user authentication flow and product listing with filters, cart and wishlist features. 
- User can login/signup with email and password.
- User will be redirected to products listing page after login.


## How can I edit and run the project locally

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <https://github.com/wasimakram-0909/AHC-Development-Tasks.git>

# Step 2: Navigate to the project directory.
cd <AHC-Development-Tasks>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.


## Techstack used in this project

Following techstack used to complete the task.

- React
- TypeScript
- Supabase // for mock apis
- Vite
- shadcn-ui
- Tailwind CSS


## Application screens 

- Login Page
![login page](readme_assets/login.png)

- Signup Page
![sign up](readme_assets/signup.png)

- Home Page
![Home page](readme_assets/home.png)

- Products List
![Products List](readme_assets/products_list.png)

- Categories
![categories](readme_assets/categories.png)

- Wishlist 
![wishlist](readme_assets/wishlist.png)

- Mobile responsive screens
![login](readme_assets/mobile_login.png)
![home](readme_assets/mobile_home.png)
![products](readme_assets/mobile_products.png)
![cart](readme_assets/mobile_cart.png)




<!-- ![Products List](readme_assets/products_list.png) -->




## APIs Info:
below are the apis used in the app
 - Login api/ Token API
 - Products API
 - Logout API


 Login API Curl

 ```
  curl --location 'https://tmnpkvhzhyfhdhsgbmkf.supabase.co/auth/v1/token?grant_type=password' \
    --header 'accept-language: en-US,en;q=0.9' \
    --header 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbnBrdmh6aHlmaGRoc2dibWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NDQ4MDQsImV4cCI6MjA1NDUyMDgwNH0.tRH9y5Qg00LZLa2uhmiYhokk3UKEKBgagKcUi0PnAnE' \
    --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbnBrdmh6aHlmaGRoc2dibWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NDQ4MDQsImV4cCI6MjA1NDUyMDgwNH0.tRH9y5Qg00LZLa2uhmiYhokk3UKEKBgagKcUi0PnAnE' \
    --header 'Content-Type: application/json' \
    --data-raw '{"email":"wasimakram.baduga@gmail.com","password":"123456","gotrue_meta_security":{}}'
 
 ```


 Products List API curl

 ```
  curl --location 'https://tmnpkvhzhyfhdhsgbmkf.supabase.co/rest/v1/products?select=*&limit=6' \
    --header 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbnBrdmh6aHlmaGRoc2dibWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NDQ4MDQsImV4cCI6MjA1NDUyMDgwNH0.tRH9y5Qg00LZLa2uhmiYhokk3UKEKBgagKcUi0PnAnE' \
    --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IkFDSURSYjdkYXZ6ZEJseHQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3RtbnBrdmh6aHlmaGRoc2dibWtmLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJkNzdiMmFmZi04ODBkLTQ4MDAtOTU5Yi04YzYxY2IyNmQyOGQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzM5MTczMzIyLCJpYXQiOjE3MzkxNjk3MjIsImVtYWlsIjoid2FzaW1ha3JhbS5iYWR1Z2FAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6Indhc2ltYWtyYW0uYmFkdWdhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJzdF9uYW1lIjoid2FzaW0iLCJsYXN0X25hbWUiOiJha3JhbSIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiZDc3YjJhZmYtODgwZC00ODAwLTk1OWItOGM2MWNiMjZkMjhkIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3MzkxNjk3MjJ9XSwic2Vzc2lvbl9pZCI6ImM0NTNmYmNiLTkzN2EtNGFlZS1hZmU3LTk1MTNiZjBjYmY2YyIsImlzX2Fub255bW91cyI6ZmFsc2V9.RH_0dkVtV7f_o2rFaZ5h-DsGfyY0Uc9ZX-rBiw8LyYU'

 ```

 Logout API curl

 ```
  curl --location --request POST 'https://tmnpkvhzhyfhdhsgbmkf.supabase.co/auth/v1/logout?scope=global' \
    --header 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbnBrdmh6aHlmaGRoc2dibWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NDQ4MDQsImV4cCI6MjA1NDUyMDgwNH0.tRH9y5Qg00LZLa2uhmiYhokk3UKEKBgagKcUi0PnAnE' \
    --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IkFDSURSYjdkYXZ6ZEJseHQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3RtbnBrdmh6aHlmaGRoc2dibWtmLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJkNzdiMmFmZi04ODBkLTQ4MDAtOTU5Yi04YzYxY2IyNmQyOGQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzM5MTczNjY5LCJpYXQiOjE3MzkxNzAwNjksImVtYWlsIjoid2FzaW1ha3JhbS5iYWR1Z2FAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6Indhc2ltYWtyYW0uYmFkdWdhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJzdF9uYW1lIjoid2FzaW0iLCJsYXN0X25hbWUiOiJha3JhbSIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiZDc3YjJhZmYtODgwZC00ODAwLTk1OWItOGM2MWNiMjZkMjhkIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3MzkxNzAwNjl9XSwic2Vzc2lvbl9pZCI6IjE3MjJkZmE5LTVkNWMtNDRkYi05NTkzLTY4NTQwZTMxZjViOCIsImlzX2Fub255bW91cyI6ZmFsc2V9.6z_iWRjH76GmDHU2BuU3RrwyQ03XVz_QHCa3hP3akf8'
  
 ```




## Developer Info
- Name: Wasim Akram
- Contact: +91 9573575873 (WhatsApp)
- LinkedIn: https://www.linkedin.com/in/wasim-akram-11864a150
- Email: wasimakram.baduga@gmail.com
