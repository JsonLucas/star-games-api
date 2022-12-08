import { App } from './utils/app';
import { port } from './utils/envConfig';

new App().application.listen(port, () => { console.log(`server running at ${port}`); });