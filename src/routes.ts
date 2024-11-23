import { type Response, type Request, Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailsUserController } from "./controllers/user/DetailsUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from "./config/multer";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailsOrderController } from "./controllers/order/DetailsOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

const route = Router();

const upload = multer(uploadConfig.upload("tmp"));

// Rotas usuarios

route.post("/users", new CreateUserController().handle);
route.post("/session", new AuthUserController().handle);
route.get("/me", isAuthenticated, new DetailsUserController().handle);

// Rotas Categoria

route.post("/category", isAuthenticated, new CreateCategoryController().handle);
route.get("/category", isAuthenticated, new ListCategoryController().handle);

// rotas produtos

route.post(
	"/product",
	isAuthenticated,
	upload.single("file"),
	new CreateProductController().handle,
);

route.get(
	"/category/product",
	isAuthenticated,
	new ListByCategoryController().handle,
);

// rotas order
route.get("/orders", isAuthenticated, new ListOrderController().handle);
route.get(
	"/orders/details",
	isAuthenticated,
	new DetailsOrderController().handle,
);

route.post("/order", isAuthenticated, new CreateOrderController().handle);
route.delete("/order", isAuthenticated, new RemoveOrderController().handle);
route.post("/order/add", isAuthenticated, new AddItemController().handle);
route.delete(
	"/order/remove",
	isAuthenticated,
	new RemoveItemController().handle,
);
route.put("/order/send", isAuthenticated, new SendOrderController().handle);
route.put("/order/finish", isAuthenticated, new FinishOrderController().handle);

export { route };
