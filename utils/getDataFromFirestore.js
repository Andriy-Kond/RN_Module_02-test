import { collection, getDocs } from "firebase/firestore";

export const getDataFromFirestore = async () => {
	try {
		// getDocs - отримує дані з колекції
		const snapshot = await getDocs(collection(db, "users"));
		// Перевіряємо у консолі отримані дані
		snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
		// Повертаємо масив об'єктів у довільній формі
		return snapshot.map((doc) => ({ id: doc.id, data: doc.data() }));
	} catch (error) {
		console.log(error);
		throw error;
	}
};
