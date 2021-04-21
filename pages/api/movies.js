import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
	const { db } = await connectToDatabase();

	if (req.method === "GET") {
		const movies = await db
			.collection("movies")
			.find({})
			.sort({ metacritic: -1 })
			.limit(20)
			.toArray();
		res.json(movies);
		console.log("i am here boy");
		console.log(req.method);
	}

	if (req.method === "POST") {
		console.log(req.body);
		const movies = await db.collection("movies").insertOne(req.body);
		res.json(movies);
	}

	// res.send({user:"pepel"})//tohle asi nefacha

	// const newMovie = await db.collection("movies");//this inserts into database
	// newMovie.insertOne({ item: "card", qty: 15 });
	//TODO - zjisti jak funguje v nextu API .. a jak vlastne k tomuhle muzu pristoupit v apce
};
