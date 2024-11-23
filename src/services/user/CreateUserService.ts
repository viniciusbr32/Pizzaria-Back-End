import { prismaClient } from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	async execute({ email, name, password }: UserRequest) {
		// verificar se ele envio um email

		if (!email) {
			throw new Error("Email Incorreto");
		}
		// verificar se esse email ja está cadastrado

		const userAlreadyExists = await prismaClient.user.findFirst({
			where: {
				email: email,
			},
		});

		if (userAlreadyExists) {
			throw new Error("Usuario ja existe");
		}

		const passwordHash = await hash(password, 8);

		const user = await prismaClient.user.create({
			data: {
				name: name,
				email: email,
				password: passwordHash,
			},
			select: {
				id: true,
				email: true,
				name: true,
			},
		});

		return user;
	}
}

export { CreateUserService };
