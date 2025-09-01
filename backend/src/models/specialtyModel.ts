import prisma from "../lib/database";

export const listSpecialties = async () => {
  return prisma.specialty.findMany({ orderBy: { name: "asc" } });
};

export const seedSpecialties = async (names: string[]) => {
  await prisma.specialty.createMany({ data: names.map((name) => ({ name })), skipDuplicates: true });
  return listSpecialties();
};
