import Player from "../models/player.model.js";
import { Op } from "sequelize";

const createPlayer = async (playerData) => {
  return await Player.create(playerData);
};

const getPlayerById = async (playerId) => {
  return await Player.findByPk(playerId);
};

const updatePlayer = async (updateData, playerId) => {
  const player = await Player.findByPk(playerId);
  if (!player) throw new Error("Jugador no encontrado");

  return await player.update(updateData);
};

const deletePlayer = async (playerId) => {
  const player = await Player.findByPk(playerId);
  if (!player) throw new Error("Jugador no encontrado");

  await player.destroy();
  return { message: "Jugador eliminado correctamente" };
};

const getAllPlayers = async () => {
  return await Player.findAll();
};

const findPlayers = async ({
  page = 1,
  limit,
  filters = {},
  sortBy = "name",
  sortOrder = "ASC",
}) => {
  console.log("[service]", filters);
  const where = {};

  if (filters.position) where.position = filters.position;
  if (filters.team) where.team = { [Op.iLike]: `%${filters.team}%` };
  if (filters.nationality) where.nationality = filters.nationality;

  if (filters.minAge || filters.maxAge) {
    where.age = {};
    if (filters.minAge) where.age[Op.gte] = filters.minAge;
    if (filters.maxAge) where.age[Op.lte] = filters.maxAge;
  }

  if (filters.minSalary || filters.maxSalary) {
    where.contract_salary = {};
    if (filters.minSalary) where.contract_salary[Op.gte] = filters.minSalary;
    if (filters.maxSalary) where.contract_salary[Op.lte] = filters.maxSalary;
  }

  if (filters.minValue || filters.maxValue || filters.excludeNullMarketValue) {
    console.log("leyendo filtro null", filters.excludeNullMarketValue);
    where.market_value = {};
    if (filters.excludeNullMarketValue) where.market_value[Op.ne] = null;
    if (filters.minValue) where.market_value[Op.gte] = filters.minValue;
    if (filters.maxValue) where.market_value[Op.lte] = filters.maxValue;
  }

  if (filters.minContractEnd || filters.maxContractEnd) {
    console.log("Applying contract filters...");
    where.contract_end = {};
    if (filters.maxContractEnd)
      where.contract_end[Op.lte] = filters.maxContractEnd;
    if (filters.minContractEnd)
      where.contract_end[Op.gte] = filters.minContractEnd;
  }

  const validSortFields = [
    "name",
    "position",
    "team",
    "appearances",
    "goals",
    "assists",
    "height",
    "weight",
    "contract_end",
    "contract_salary",
    "market_value",
    "nationality",
    "age",
  ];

  const validSortOrder = ["ASC", "DESC"];

  const sortField = validSortFields.includes(sortBy) ? sortBy : "name";
  const sortDirection = validSortOrder.includes(sortOrder.toUpperCase())
    ? sortOrder.toUpperCase()
    : "ASC";

  const query = {
    where,
    order: [[sortField, sortDirection]],
  };

  if (limit !== "null") {
    console.log("djoly")((query.limit = limit)),
      (query.offset = (page - 1) * limit);
  }

  const result = await Player.findAndCountAll({
    ...query,
  });

  const players = {
    players: result.rows,
  };

  if (limit !== "null") {
    players.pagination = {
      currentPage: parseInt(page),
      totalPages: Math.ceil(result.count / limit),
      totalItems: result.count,
    };
  }

  return players;
};

export const PlayerService = {
  findPlayers,
  createPlayer,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  getAllPlayers,
};
