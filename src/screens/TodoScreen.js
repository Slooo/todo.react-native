import React, {useState, useContext} from 'react'
import {StyleSheet, View, Dimensions} from 'react-native'
import {FontAwesome, AntDesign} from '@expo/vector-icons'
import {THEME} from '../theme'
import {AppCard} from '../components/ui/AppCard'
import {EditModal} from '../components/EditModal'
import {AppText} from '../components/ui/AppText'
import {AppButton} from '../components/ui/AppButton'
import {TodoContext} from '../context/todo/todoContext'
import {ScreenContext} from '../context/screen/screenContext'


export const TodoScreen = () => {
  const {todos, updateTodo, removeTodo} = useContext(TodoContext)
  const {todoId, changeScreen} = useContext(ScreenContext)
  const [modal, openModal] = useState(false)

  const todo = todos.find(t => t.id === todoId)

  const saveHandler = title => {
    updateTodo({id: todo.id, title})
    openModal(false)
  }

  return (
    <View style={styles.card}>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => openModal(false)}
        onSave={saveHandler}
      />

      <AppText>Todo screen</AppText>
      <AppCard>
        <AppText style={styles.text}>{todo.title}</AppText>
        <AppButton onPress={() => openModal(true)}>
          <FontAwesome name="edit" size={20}/>
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton color={THEME.GREY_COLOR} onPress={() => changeScreen(null)}>
            <AntDesign name="back" size={20} color="#fff"/>
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton color={THEME.DANGER_COLOR} onPress={() => removeTodo(todo.id)}>
            <FontAwesome name="remove" size={20} color="#fff"/>
          </AppButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    marginBottom: 20
  },
  button: {
    width: Dimensions.get('window').width > 400 ? 150 : 100
  },
  text: {
    fontSize: 20
  }
})
