import { httpServer } from "./routes/socket";

httpServer.listen(8899, () => {
    console.log(`Server start ${8899}`);
})