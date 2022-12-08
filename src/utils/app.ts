import express, { json, Application } from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from '../routes';
import errorHandler from '../errors/errorHandler';

export class App {
	public application: Application;

	constructor() {
		this.application = express();
		this.middleware();
		this.routes();
		this.application.use(errorHandler);
	}

	middleware() {
		this.application.use(cors());
		this.application.use(json());
	}
	routes() {
		this.application.use(router);
	}
}