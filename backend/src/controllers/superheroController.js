const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;

  const superheroes = await prisma.superhero.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: { images: true },
  });

  res.json(superheroes.map(sh => ({
    id: sh.id,
    nickname: sh.nickname,
    image: sh.images[0]?.url || null
  })));
};

const getOne = async (req, res) => {
  const id = parseInt(req.params.id);
  const superhero = await prisma.superhero.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!superhero) return res.status(404).json({ message: 'Superhero not found' });
  res.json(superhero);
};

const create = async (req, res) => {
  const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;

  const uploadedImages = req.files?.map(file => `/uploads/${file.filename}`) || [];

  const imagesFromBody = req.body.images || [];

  const superhero = await prisma.superhero.create({
    data: {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images: {
        create: [...uploadedImages, ...imagesFromBody].map(url => ({ url })),
      },
    },
    include: { images: true },
  });

  res.json(superhero);
};

const update = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;

  const uploadedImages = req.files?.map(file => `/uploads/${file.filename}`) || [];
  const imagesFromBody = req.body.images || [];

  const superhero = await prisma.superhero.update({
    where: { id },
    data: {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images: {
        deleteMany: {},
        create: [...uploadedImages, ...imagesFromBody].map(url => ({ url })),
      },
    },
    include: { images: true },
  });

  res.json(superhero);
};

const remove = async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.superhero.delete({ where: { id } });
  res.json({ message: 'Deleted successfully' });
};

module.exports = { getAll, getOne, create, update, remove };
