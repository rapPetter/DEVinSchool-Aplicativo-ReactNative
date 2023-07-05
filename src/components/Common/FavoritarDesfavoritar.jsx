import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native"

const FavoritarDesfavoritar = ({ variavel, funcao, salvarDessalvar }) => {
    return (
        <TouchableOpacity onPress={() => { funcao(!variavel); salvarDessalvar() }}>
            {variavel ?
                <Octicons name="heart" size={24} color="#7353BA" />
                :
                <Octicons name="heart-fill" size={24} color="#7353BA" />
            }
        </TouchableOpacity>
    )
}

export default FavoritarDesfavoritar;