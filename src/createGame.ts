import random from "lodash/random";

import { Id } from "./Id";
import { Address } from "./Model/Address";
import { Farmhouse } from "./Model/Buildings/Farmhouse";
import { GuildHall } from "./Model/Buildings/GuildHall";
import { Residence, ResidenceKind } from "./Model/Buildings/Residence";
import { Character } from "./Model/Character";
import { CoorKind } from "./Model/Coor";
import { Currency } from "./Model/Currency/Currency";
import { Dungeon } from "./Model/Dungeon/Dungeon";
import { Faction } from "./Model/Faction";
import { Family } from "./Model/Family";
import { Game } from "./Model/Game";
import { Guild } from "./Model/Guild";
import { LandNode as Node } from "./Model/Node";
import { IdMap } from "./Struct/IdMap";
import { createUniqueNames } from "./utils/createUniqueName";

export function createGame(): Game {
  const characters = new IdMap<Character>();
  const families = new IdMap<Family>();
  const landNodes = [];
  const residences = Array<Residence>();
  const addresses = new Map<Id, Address>();
  const factions = new IdMap<Faction>();
  const currencies = new IdMap<Currency>();

  const { id: factionId, set: setFaction } = factions.reserveSlot();
  const { id: currencyId, set: setCurrency } = currencies.reserveSlot();

  const names = createUniqueNames(10);

  const nodeId = landNodes.length;

  names.forEach((name) => {
    const { id: characterId, set: setCharacter } = characters.reserveSlot();
    const { id: familyId, set: setFamily } = families.reserveSlot();

    setCharacter(
      new Character({
        name,
        coor: {
          type: CoorKind.Node,
          nodeId,
        },
        attr: {
          physique: 5,
          intelligence: 5,
          mana: 5,
          social: 5,
          luck: 5,
        },
        actionCapacity: 3,
        education: { literacy: 10 },
        stress: 0,
        familyId,
      })
    );

    setFamily({
      head: characterId,
      partners: new Set(),
      children: new Set(),
    });

    const residenceId = residences.length;
    const unitId = 0;

    const type = ResidenceKind.Shack;

    residences.push({
      name: `${name}'s ${ResidenceKind[type]}`,
      type,
      owner: characterId,
      families: new Set([familyId]),
    });

    addresses.set(familyId, {
      nodeId,
      residenceId,
      unitId,
    });
  });

  setCurrency(
    new Currency({
      controller: factionId,
      name: "Dollar",
      holders: {
        personal: new Map(),
        corporate: new Map(),
        government: new Map(),
      },
    })
  );

  setFaction(
    new Faction({
      name: "Oceania",
      ownedNodes: new Set([nodeId]),
      capital: nodeId,
      currency: currencyId,
    })
  );

  const guilds = new IdMap<Guild>();

  landNodes.push(
    new Node({
      name: "Airstrip One",
      coor: { type: CoorKind.Planet, x: 2, y: 3 },
      allUsableLand: random(6000, 15000),
      claimedLand: 1000,
      usedLand: 1000,
      population: 1000,
      farmhouses: [],
      guildHalls: [],
      dungeons: [],
      shops: [],
      residences,
      suzerain: factionId,
    })
  );

  return new Game({
    addresses,
    characters,
    currencies,
    guilds,
    families,
    landNodes,
    landmarks: {
      farmhouses: new IdMap<Farmhouse>(),
      guildHalls: new IdMap<GuildHall>(),
      dungeons: new IdMap<Dungeon>(),
    },
    factions,
    playerId: 0,
  });
}
