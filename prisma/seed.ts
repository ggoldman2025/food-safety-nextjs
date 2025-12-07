import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const stores = [
  { name: "Walmart", url: "https://corporate.walmart.com/recalls", category: "grocery" },
  { name: "Kroger", url: "https://www.kroger.com/i/recall-alerts", category: "grocery" },
  { name: "Albertsons", url: "https://www.albertsons.com/our-company/recalls.html", category: "grocery" },
  { name: "Publix", url: "https://www.publix.com/product-recalls", category: "grocery" },
  { name: "Whole Foods", url: "https://www.wholefoodsmarket.com/recalls", category: "grocery" },
  { name: "Trader Joe's", url: "https://www.traderjoes.com/home/announcements", category: "grocery" },
  { name: "Safeway", url: "https://www.safeway.com/ShopStores/Recalls.page", category: "grocery" },
  { name: "Target", url: "https://help.target.com/help/subcategoryarticle?childcat=Product+recalls", category: "retailer" },
  { name: "Costco", url: "https://www.costco.com/recalls.html", category: "grocery" },
  { name: "Sam's Club", url: "https://help.samsclub.com/app/answers/detail/a_id/1382", category: "grocery" },
  { name: "Aldi", url: "https://www.aldi.us/en/about-aldi/product-recalls/", category: "grocery" },
  { name: "Lidl", url: "https://www.lidl.com/recalls", category: "grocery" },
  { name: "H-E-B", url: "https://www.heb.com/static-page/product-recalls", category: "grocery" },
  { name: "Wegmans", url: "https://www.wegmans.com/news-media/product-recalls/", category: "grocery" },
  { name: "Meijer", url: "https://www.meijer.com/shopping/recalls.html", category: "grocery" },
  { name: "Food Lion", url: "https://www.foodlion.com/pages/product-recalls", category: "grocery" },
  { name: "Stop & Shop", url: "https://stopandshop.com/pages/product-recalls", category: "grocery" },
  { name: "Giant Food", url: "https://giantfood.com/pages/product-recalls", category: "grocery" },
  { name: "ShopRite", url: "https://www.shoprite.com/sm/pickup/rsid/610/recalls", category: "grocery" },
  { name: "Sprouts", url: "https://www.sprouts.com/customer-service/product-recalls/", category: "grocery" },
  { name: "Fresh Thyme", url: "https://www.freshthyme.com/recalls", category: "grocery" },
  { name: "WinCo Foods", url: "https://www.wincofoods.com/recalls", category: "grocery" },
  { name: "Harris Teeter", url: "https://www.harristeeter.com/i/recall-alerts", category: "grocery" },
  { name: "Raley's", url: "https://www.raleys.com/recalls/", category: "grocery" }
]

async function main() {
  console.log('Seeding database...')
  
  for (const store of stores) {
    await prisma.companyLink.create({ data: store })
  }
  
  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
