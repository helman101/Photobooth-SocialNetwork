import { ID } from "appwrite"
import { INewUser, IUserFromAccount } from "../../types"
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