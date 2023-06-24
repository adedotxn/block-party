import { db } from '@lib/firebase/client';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';

export const createDefaultGroups = async (boardCode: string) => {
  const batch = writeBatch(db);

  try {
    //getting the board from the board code
    const boardsRef = collection(db, 'boards');
    const q = query(boardsRef, where('boardCode', '==', boardCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // No matching board found
      return { status: 'error', message: 'No Board Found' };
    } else {
      // Matching board found
      const boardDoc = querySnapshot.docs[0];
      const boardRef = doc(db, 'boards', boardDoc.id);
      const groupRef = collection(boardRef, 'groups');

      // Define default groups
      const defaultGroups = [
        {
          display: '',
          name: 'Crafters',
          adminId: 'default',
          id: nanoid(),
          members: [],
          description:
            'Join a community of passionate crafters and unleash your creativity!',
          events: [],
        },
        {
          display: '',
          name: 'Book Worms',
          adminId: 'default',
          id: nanoid(),
          members: [],
          description:
            'Dive into the world of literature with fellow book enthusiasts.',
          events: [],
        },
        {
          display: '',
          name: 'Footballers',
          adminId: 'default',
          id: nanoid(),
          members: [],
          description:
            'Lace up your boots and join us for exhilarating football matches.',
          events: [],
        },

        {
          display: '',
          name: 'Green Thumbs',
          adminId: 'default',
          id: nanoid(),
          members: [],
          description:
            'Discover the joys of gardening and exchange tips with fellow plant lovers.',
          events: [],
        },
        {
          display: '',
          name: 'Game Warriors',
          adminId: 'default',
          id: nanoid(),
          members: [],
          description:
            'Calling all gamers! Join our group and conquer the virtual realms together.',
          events: [],
        },
        {
          display: '',
          name: 'Fitness Warriors',
          adminId: 'default',
          id: nanoid(),
          members: [],
          description:
            'Embrace a healthy lifestyle with like-minded fitness enthusiasts.',
          events: [],
        },
        {
          display: '',
          name: 'Popcorn Munchers',
          adminId: 'default',
          id: nanoid(),
          members: [],
          description:
            'Movie buffs unite! Join us for movie nights and discussions about the latest films.',
          events: [],
        },

        {
          display: '',
          name: 'Cats Lovers',
          adminId: 'default',
          id: nanoid(),
          members: [],
          description:
            'A community for cat enthusiasts to exchange meow-worthy tales and tips.',
          events: [],
        },

        {
          display: '',
          name: 'Boardgame Guild',
          adminId: 'default',
          id: nanoid(),
          members: [],
          description:
            'Dive into the world of board games and enjoy hours of strategic fun with other board game enthusiasts.',
          events: [],
        },

        {
          display: '',
          name: 'Outdoor Explorers',
          adminId: 'default',
          id: nanoid(),
          members: [],
          description:
            "Embark on thrilling outdoor adventures and explore nature's wonders with fellow adventure seekers",
          events: [],
        },
      ];

      // Add each default group to the batch
      defaultGroups.forEach((group) => {
        const newGroupRef = doc(groupRef);
        batch.set(newGroupRef, group);
      });

      // Commit the batch
      await batch.commit();

      return { status: 'success' };
    }
  } catch (error) {
    console.log(error);
    return { status: 'error', message: 'Error occured while creating groups' };
  }
};

export const createGroup = async (
  groupDetails: { name: string; description: string; adminId: string },
  boardCode: string
) => {
  const groupId = nanoid();

  // const groupExists = await getSpecificGroup(groupDetails.name, boardCode);
  // if (groupExists?.status === 'success')
  //   return { status: 'error', message: 'Group with this name already exists' };

  try {
    //getting the board from the board code
    const boardsRef = collection(db, 'boards');
    const q = query(boardsRef, where('boardCode', '==', boardCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // No matching board found
      return { status: 'error', message: 'No Board Found' };
    } else {
      // Matching board found
      const boardDoc = querySnapshot.docs[0];
      const boardRef = doc(db, 'boards', boardDoc.id);
      const groupRef = collection(boardRef, 'groups');

      // Creating a new group's document in the collection
      const newGroup = {
        name: groupDetails.name,
        adminId: groupDetails.adminId,
        id: groupId,
        members: [],
        description: groupDetails.description,
        events: [],
      };
      await addDoc(groupRef, newGroup);
      return {
        status: 'success',
        message: `${groupDetails.name} group created successfully! Have fun.`,
        groupId,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getGroups = async (boardCode: string) => {
  try {
    //getting the board from the board code
    const boardsRef = collection(db, 'boards');
    const q = query(boardsRef, where('boardCode', '==', boardCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { status: 'error', message: 'No Board Found' };
    } else {
      // getting the groups collection from inside a board
      const boardDoc = querySnapshot.docs[0];
      const boardRef = doc(db, 'boards', boardDoc.id);

      //locating the groups
      const groupRef = collection(boardRef, 'groups');
      const snapshot = await getDocs(groupRef);

      if (snapshot.empty) {
        console.log('No matching document');
        return { status: 'error', message: 'No Group Found' };
      } else {
        const groups = snapshot.docs.map((doc) => doc.data());
        return { status: 'success', data: groups };
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return { status: 'error', message: error };
    }
  }
};

export const getGroupRef = async (boardCode: string, id: string) => {
  const boardsRef = collection(db, 'boards');
  const q = query(boardsRef, where('boardCode', '==', boardCode));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return { status: 'error', message: 'No Board Found' };
  } else {
    // getting the groups collection from inside a board
    const boardDoc = querySnapshot.docs[0];
    const boardRef = doc(db, 'boards', boardDoc.id);

    //locating the groups
    const groupRef = collection(boardRef, 'groups');
    const q = query(groupRef, where('id', '==', id));
    const snapshot = await getDocs(q);

    return { status: 'success', data: snapshot };
  }
};

export const getSpecificGroupWithId = async (id: string, boardCode: string) => {
  try {
    const groupRef = await getGroupRef(boardCode, id);

    if (groupRef.status === 'error')
      return { status: 'error', message: groupRef.message };

    if (groupRef.status === 'success' && groupRef.data) {
      const snapshot = groupRef.data;
      let document;
      if (snapshot.empty) {
        return { status: 'error', message: 'No Such Group Found' };
      } else {
        snapshot.forEach((doc) => {
          document = doc.data();
        });
      }
      return { status: 'success', data: document };
    }
  } catch (error) {
    return { status: 'error', message: error };
  }
};

export const joinGroup = async (
  boardCode: string,
  user: { id: string; name: string },
  group: { id: string; name: string }
) => {
  try {
    // update the group doc with the user details
    const groupRef = await getGroupRef(boardCode, group.id);
    if (groupRef.status === 'error')
      return { status: 'error', message: groupRef.message };

    if (groupRef.data) {
      const snapshot = groupRef.data;
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        try {
          //update the group with the new user
          console.log(user);
          const reponse = await updateDoc(doc.ref, {
            members: arrayUnion(user),
          });
          console.log({ reponse });

          // then update the user docs with the group details
          const userRef = collection(db, 'users');
          const q = query(userRef, where('userId', '==', user.id));
          const userQuerySnapshot = await getDocs(q);

          if (!userQuerySnapshot.empty) {
            const doc = userQuerySnapshot.docs[0];
            try {
              await updateDoc(doc.ref, { groups: arrayUnion(group) });
              return {
                status: 'success',
              };
            } catch (error) {
              return { status: 'error', error };
            }
          }
        } catch (error) {
          return { status: 'error', error };
        }
      }
    }
  } catch (error) {
    return { status: 'error', error };
  }
};

export const leaveGroup = async (
  boardCode: string,
  groupId: string,
  memberId: string
) => {
  try {
    // get the user object
    const userRef = collection(db, 'users');
    const userQuery = query(userRef, where('userId', '==', memberId));
    const userQuerySnapshot = await getDocs(userQuery);
    if (userQuerySnapshot.empty) {
      return { status: 'error', message: 'User not found' };
    }
    const userDoc = userQuerySnapshot.docs[0];
    const user = userDoc.data();
    console.log(user);

    // get the group object
    const groupRef = await getGroupRef(boardCode, groupId);
    if (groupRef.status === 'error')
      return { status: 'error', message: groupRef.message };
    if (!groupRef.data || groupRef.data.empty) {
      return { status: 'error', message: 'Group not found' };
    }
    const groupDoc = groupRef.data.docs[0];
    const group = groupDoc.data();

    // update the group doc by removing the user details
    try {
      //update the group by removing the user
      await updateDoc(groupDoc.ref, {
        members: arrayRemove({ id: user.userId, name: user.fullName }),
      });

      // then update the user docs by removing the group details
      try {
        await updateDoc(userDoc.ref, {
          groups: arrayRemove({ id: group.id, name: group.name }),
        });

        return {
          status: 'success',
        };
      } catch (error) {
        return { status: 'error', error };
      }
    } catch (error) {
      return { status: 'error', error };
    }
  } catch (error) {
    console.log(error);
  }
};
