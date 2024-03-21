import { ID, Query } from "appwrite"
import { INewUser, ISessionUser, IUserFromAccount } from "../../types"
import { account, appwriteConfig, avatars, databases } from "./config"

// Create user account
export async function createUserAccount(user: INewUser) {
  try {
    // Create an account
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )

    if (!newAccount) throw Error

    // Create an avatar (profile img) for users with appwrite "avatar" tool
    const avatarUrl = avatars.getInitials(user.name)

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl
    })

    return newUser
  } catch (error) {
    console.log(error)
    return error
  }
}

// Create user document on the Users database
export async function saveUserToDB(user: IUserFromAccount) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    )

    return newUser
  } catch (error) {
    console.log(error)
  }
}

// Create a new session
export async function signInAccount(user: ISessionUser) {
  try {
    const session = await account.createEmailSession(user.email, user.password)

    return session
  } catch (error) {
    console.log(error)
  }
}

// Get the current user
export async function getCurrentUser() {
  try {
    // Get account
    const currentAccount = await account.get()

    // Check if current account exists in database
    if(!currentAccount) throw Error;

    // If exists try to retrieve account from database
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error;

    return currentUser.documents[0]
  } catch (error) {
    console.log(error)
  }
}