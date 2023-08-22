import { getDatabase, onValue, ref, set } from "firebase/database";
import { UserRoot } from "./model";
import { getAuth } from "firebase/auth";

export const loadUserRoot = (): Promise<UserRoot> => {
  console.debug("loading user root");
  return new Promise<UserRoot>((resolve, reject) => {
    const auth = getAuth();
    const db = getDatabase();
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.debug("no uid");
      reject("no user logged");
    } else {
      console.debug("fetching for uid", uid);
      const rootRef = ref(db, "users/" + uid);
      onValue(rootRef, (snapshot) => {
        console.debug("fetched value", snapshot);
        const data = snapshot.val();
        resolve(data);
      });
    }
  });
};

export const saveUserRoot = (data: UserRoot): void => {
  const auth = getAuth();
  const db = getDatabase();
  const uid = auth.currentUser?.uid;
  if (uid) {
    console.debug("store", uid, data);
    const rootRef = ref(db, "users/" + uid);
    set(rootRef, data);
  } else {
    console.debug("no uid");
  }
};
