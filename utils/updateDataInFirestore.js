import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const updateDataInFirestore = async (collectionName, docId) => {
	try {
		// ref - посилання на об'єкт у базі
		const ref = doc(db, collectionName, docId);

		// updateDoc - метод для оновлення
		await updateDoc(ref, {
			age: 25,
		});
		console.log("document updated");
	} catch (error) {
		console.log(error);
	}
};
