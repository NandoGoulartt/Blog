import mongoose, { Document, Types } from "mongoose";

interface PostagemInterface extends Document {
  title: string;
  thumbnail: string;
  content: string;
  usuario: Types.ObjectId;
}

const postagemSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  content: String,
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Postagem = mongoose.model<PostagemInterface>("Postagem", postagemSchema);

export default Postagem;
