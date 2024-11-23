import type { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
	async handle(req: Request, res: Response) {
		const { name, table } = req.body;

		const createOrderService = new CreateOrderService();

		const order = await createOrderService.execute({
			name,
			table,
		});

		res.json(order);
	}
}

export { CreateOrderController };
