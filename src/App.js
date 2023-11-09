import React, { useEffect, useState } from 'react';
import {
  getDocs,
  addDoc,
  deleteDoc,
  collection,
  doc,
  updateDoc
} from 'firebase/firestore/lite';
import { db, auth, storage } from 'config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { Auth } from './components/auth';

export const App = () => {
  const [personList, setPersonList] = useState([]);
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonAge, setNewPersonAge] = useState(0);
  const [uppdatedName, setUppdatedName] = useState('');
  const [fileUpload, setFileUpload] = useState();

  const personsCollectionRef = collection(db, 'person');
  // const storedStorage = getStorage();
  // const pathReference = ref(storedStorage, 'projectFiles/2.png');

  const getPerson = async () => {
    try {
      const data = await getDocs(personsCollectionRef);
      const filteredData = data.docs.map((d) => ({
        ...d.data(),
        id: d.id
      }));
      setPersonList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(auth?.currentUser?.uid);
  const onSubmitPerson = async () => {
    try {
      await addDoc(personsCollectionRef, {
        name: newPersonName,
        age: newPersonAge,
        userId: auth?.currentUser?.uid
      });
      getPerson();
    } catch (err) {
      console.error(err);
    }
  };
  const deletePerson = async (id) => {
    try {
      const personDoc = doc(db, 'person', id);
      await deleteDoc(personDoc);
      getPerson();
    } catch (err) {
      console.error(err);
    }
  };
  const uppdateName = async (id) => {
    try {
      const personDoc = doc(db, 'person', id);
      await updateDoc(personDoc, { name: uppdatedName });
      getPerson();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPerson();
  }, []);

  return (
    <>
      <h1>Firebase Practice</h1>
      <Auth />
      <div>
        <input
          type="text"
          placeholder="name..."
          onChange={(e) => setNewPersonName(e.target.value)}
        />
        <input
          type="number"
          placeholder="age..."
          onChange={(e) => setNewPersonAge(Number(e.target.value))}
        />
        <button type="button" onClick={onSubmitPerson}>
          create person
        </button>
      </div>
      <div>
        {personList.map((p) => {
          return (
            <div key={p.id}>
              <p>
                {p.name} age: {p.age}
              </p>{' '}
              <button type="button" onClick={() => deletePerson(p.id)}>
                Delete
              </button>
              <input
                type="text"
                placeholder="new name"
                onChange={(e) => setUppdatedName(e.target.value)}
              />
              <button type="button" onClick={() => uppdateName(p.id)}>
                uppdate Name
              </button>
              <div>
                <input
                  type="file"
                  onChange={(e) => setFileUpload(e.target.files[0])}
                />
                <button type="button" onClick={uploadFile}>
                  Add image
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
