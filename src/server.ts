import "dotenv/config";
import app from "./app.js";

const PORT: number = 3000;

app.then(app => {
    app.listen(PORT, () => {
        console.log("Servidor Online");
    });
}); 