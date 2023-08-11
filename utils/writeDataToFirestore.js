// import { collection, addDoc } from "firebase/firestore";
// import { dbDatabase, dbFirestore } from "../firebase/config";

// export const writeDataToFirestore = async (capturedPhoto) => {
// 	// console.log("writeDataToFirestore >> capturedPhoto:", capturedPhoto);
// 	try {
// 		// addDoc - додає дані в колекцію
// 		// collection - створює колекцію у базі даних db
// 		const docRef = await addDoc(collection(dbDatabase, "DCIM/"), {
// 			capturedPhoto,
// 		});
// 		// docRef.id - id документа, створеного в колекції
// 		console.log("Document written with ID: ", docRef.id);
// 	} catch (e) {
// 		console.error("Error adding document: ", e);
// 		throw e;
// 	}
// };
