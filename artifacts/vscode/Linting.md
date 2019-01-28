#Linting in Visual Studio Code
If you want to have real-time linting checks during development you need to install the ESlint extension in Visual Studio code and make the following changes to the User Settings.

```json
"eslint.validate": [
  {
   "language": "vue",
   "autoFix": true
   },
   {
     "language": "html",
     "autoFix": true
   },
   {
     "language": "javascript",
      "autoFix": true
    },
    {
      "language": "javascriptreact",
       "autoFix": true
     }
]
```

If you also want them automatically fixed when saving you can add the following setting
```json  
  "eslint.autoFixOnSave": true
```