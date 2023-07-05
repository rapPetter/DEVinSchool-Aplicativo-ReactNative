import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native"

const OlhoSenha = ({ variavel, funcao }) => {
    return (
        <TouchableOpacity onPress={() => funcao(!variavel)}>
            {variavel ?
                <Ionicons name='eye' color='#7353BA' size={25} />
                :
                <Ionicons name='eye-off' color='#7353BA' size={25} />
            }
        </TouchableOpacity>
    )
}

export default OlhoSenha;