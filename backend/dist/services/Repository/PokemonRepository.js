'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.LikeRepository = void 0
const __1 = require('..')
const Error_1 = require('../Error')
const LikeRepository = (baseRepository) => {
  return {
    getPokemonLikes: getPokemonLikes(baseRepository),
    addPokemonLike: addPokemonLike(baseRepository),
  }
}
exports.LikeRepository = LikeRepository
const getPokemonLikes = (baseRepository) => async (pokemonId) => {
  console.log('here')
  const transactionResult = await baseRepository.transaction(async (client) => {
    const res = await client.query({
      text: 'SELECT COUNT(*) FROM "like" WHERE pokemon_id = $1',
      values: [pokemonId],
    })
    return {
      type: 'successPayload',
      result: res,
    }
  })
  if (transactionResult.type == 'successPayload') {
    const { rows } = transactionResult.result
    return { type: 'success', like: rows[0].count }
  }
  if (transactionResult.type == 'error') return transactionResult
  return (0, __1.createErrorMessage)("success sans payload n'existe pas")
}
// we need the username
const addPokemonLike =
  (baseRepository) => async (pokemonId, pokemonName, likeNumber, username) => {
    const res = await baseRepository.transaction(async (client) => {
      const user_uuid = await getUserUuid(client, username)
      const pokemonLike = await getPokemonLike(client, pokemonId)
      // no pokemon -1 => erreur, 1 => on ajoute le pokemon
      if (pokemonLike == 0) {
        if (likeNumber == -1)
          return (0, __1.createErrorMessage)('nombre de like finaux negatifs')
        // on cree le pokemon dans la table pokemon
        return createPokemonAndLikeEntry(
          client,
          pokemonId,
          pokemonName,
          user_uuid
        )
      }
      // il y a un pokemon => si -1 et une seule entrée (ou like), on le supprime
      // si 1, on ajoute une entrée au pokemonLike
      // si on ajoute en double, l'erreur est généré par la table
      if (pokemonLike == 1 && likeNumber == -1)
        return deletePokemonAndLikeEntry(client, pokemonId, user_uuid)
      if (likeNumber == 1) return addLikeEntry(client, pokemonId, user_uuid)
      return deleteLikeEntry(client, pokemonName, user_uuid)
      await client.query({
        text: 'UPDATE pokemon SET "like" = $1 WHERE "name" = $2 RETURNING *',
        values: [newNumberLike, pokemonName],
      })
      return (0, Error_1.createSuccessMessage)(
        'le like a été correctement ajouté/supprime en base de données'
      )
    })
    if (res.type == 'successPayload')
      return (0, __1.createErrorMessage)("success sans payload n'existe pas")
    return res
  }
const getUserUuid = async (client, username) => {
  const { rows } = await client.query({
    text: 'SELECT "user_uuid" FROM "user" WHERE "username" = $1',
    values: [username],
  })
  return rows[0].user_uuid
}
const createPokemonAndLikeEntry = async (
  client,
  pokemonId,
  pokemonName,
  user_uuid
) => {
  await addPokemonEntry(client, pokemonId, pokemonName)
  await addLikeEntry(client, pokemonId, user_uuid)
  return (0, Error_1.createSuccessMessage)("l'utilisateur a été crée")
}
const addLikeEntry = async (client, pokemonId, user_uuid) => {
  await client.query({
    text: 'INSERT INTO "like"("user_uuid","pokemon_id") VALUES($1,$2)',
    values: [user_uuid, pokemonId],
  })
}
const addPokemonEntry = async (client, pokemonId, pokemonName) => {
  await client.query({
    text: 'INSERT INTO "pokemon"("id", "name") VALUES($1, $2) RETURNING *',
    values: [pokemonId, pokemonName],
  })
}
const deleteLikeEntry = async (client, pokemonId, user_uuid) => {
  await client.query({
    text: 'DELETE FROM "like" WHERE user_uuid = $1 AND pokemon_id = $2',
    values: [user_uuid, pokemonId],
  })
}
const deletePokemonEntry = async (client, pokemonId) => {
  await client.query({
    text: 'DELETE FROM "pokemon" WHERE id = $1',
    values: [pokemonId],
  })
}
const deletePokemonAndLikeEntry = async (client, pokemonId, user_uuid) => {
  deleteLikeEntry(client, pokemonId, user_uuid)
  deletePokemonEntry(client, pokemonId)
  return (0, Error_1.createSuccessMessage)('l utilisateur a ete supprime')
}
const getPokemonLike = async (client, pokemonId) => {
  const { rows } = await client.query({
    text: 'SELECT COUNT(*) FROM "like" WHERE pokemon_id = $1',
    values: [pokemonId],
  })
  return rows[0].count
}
