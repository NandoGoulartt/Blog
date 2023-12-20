import mongoose, { Document, Model } from "mongoose";

export interface UsuarioInterface extends Document {
  nome: string;
  email: string;
  senha: string;
}

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
});



const Usuario = mongoose.models?.Usuario || mongoose.model<UsuarioInterface>("Usuario", usuarioSchema);

export default Usuario;
