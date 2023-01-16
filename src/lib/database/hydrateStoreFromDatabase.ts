import { useStore } from 'app/stores'
import { db } from 'lib/database/useDatabase'

export const hydrateStoreFromDatabase = async () => {
  const { addUsers, addNotes, addReactions, addChannels, addChannelMessages } =
    useStore.getState()

  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM arc_users',
      [],
      (_, { rows: { _array } }) => {
        const users = _array.map((user) => {
          return user
        })
        addUsers(users)
      },
      (_, error) => {
        console.log('Error querying arc_users', error)
        return false
      }
    )

    tx.executeSql(
      'SELECT * FROM arc_notes',
      [],
      (_, { rows: { _array } }) => {
        const notes = _array.map((note) => {
          return note
        })
        addNotes(notes)
      },
      (_, error) => {
        console.log('Error querying arc_notes', error)
        return false
      }
    )

    tx.executeSql(
      'SELECT * FROM arc_reactions',
      [],
      (_, { rows: { _array } }) => {
        const reactions = _array.map((reaction) => {
          return reaction
        })
        addReactions(reactions)
      },
      (_, error) => {
        console.log('Error querying arc_reactions', error)
        return false
      }
    )

    tx.executeSql(
      'SELECT * FROM arc_channels',
      [],
      (_, { rows: { _array } }) => {
        const channels = _array.map((channel) => channel)
        addChannels(channels)
      },
      (_, error) => {
        console.log('Error querying arc_channels', error)
        return false
      }
    )

    tx.executeSql(
      'SELECT * FROM arc_channel_messages',
      [],
      (_, { rows: { _array } }) => {
        const channelMessages = _array.map((channelMessage) => channelMessage)
        addChannelMessages(channelMessages)
      },
      (_, error) => {
        console.log('Error querying arc_channel_messages', error)
        return false
      }
    )
  })
}
