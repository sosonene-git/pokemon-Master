import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { pokemonNameMapping } from "@/data/pokemonNameMap";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonImage, setPokemonImage] = useState("");
  const [error, setError] = useState("");

  const searchPokemon = async () => {
    if (!pokemonName) return;

    try {
      // 日本語名を英語名に変換（マッピングにない場合はそのまま使用）
      const englishName =
        pokemonNameMapping[pokemonName] || pokemonName.toLowerCase();

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${englishName}`
      );
      if (!response.ok) {
        throw new Error("ポケモンが見つかりません");
      }
      const data = await response.json();
      setPokemonImage(data.sprites.front_default);
      setError("");
    } catch (err) {
      console.error("Error fetching Pokemon:", err);
      setPokemonImage("");
      setError("ポケモンが見つかりませんでした。名前を確認してください。");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600">
          ポケモンをゲットする
        </h2>
      </div>
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <input
          type="text"
          className="input-form px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="ポケモン名を入力（日本語可）"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button
          onClick={searchPokemon}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
        >
          ゲット！！
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {pokemonImage && (
        <div className="mt-4">
          <Image
            src={pokemonImage}
            alt={pokemonName}
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
}
