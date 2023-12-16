import { IStory, IStoryCategory } from "@/types/IStory";
import DonationThumbnail1 from "@/assets/donate-thumbnail-1.jpg";
import DonationThumbnail2 from "@/assets/donate-thumbnail-2.jpg";
import DonationThumbnail3 from "@/assets/donate-thumbnail-3.jpg";

export const storyDonationData: IStory[] = [
  {
    id: "1",
    image: DonationThumbnail1,
    date: "June 27, 2023",
    title: "Flood in Lamboa",
    content:
      "Lamboa community needs your help for crisis management from 3 days of non-stop flooding.",
    categoryName: "Disaster",
    categoryId: "1",
    analytics: {
      count: 230,
    },
  },
  {
    id: "2",
    image: DonationThumbnail2,
    date: "July 39, 2022",
    title: "Tsunami in Malika",
    content:
      "Emergency! A tsunami has just hit Malika, Tarasudi District. Help our affected brothers and sisters.",
    categoryName: "Disaster",
    categoryId: "1",
    analytics: {
      count: 1099,
    },
  },
  {
    id: "3",
    image: DonationThumbnail1,
    date: "July 19, 2022",
    title: "Help African Children",
    content:
      "African children need your help to get proper food and water. Prolonged crisis is a real urgency.",
    categoryName: "Children",
    categoryId: "2",
    analytics: {
      count: 748,
    },
  },
  {
    id: "4",
    image: DonationThumbnail2,
    date: "July 30, 2022",
    title: "Sianka Forest Fire",
    content:
      "The Sianka forest has caught fire and affected the surrounding community. Let's help buy their health facilities!",
    categoryName: "Children",
    categoryId: "2",
    analytics: {
      count: 748,
    },
  },
  {
    id: "5",
    image: DonationThumbnail3,
    date: "Sept 1, 2023",
    title: "Soporo Earthquake",
    content:
      "A magnitude 7.3 earthquake has shaken Saporo sub-district, help them recover with food and medicine.",
    categoryName: "Health",
    categoryId: "3",
    analytics: {
      count: 760,
    },
  },
  {
    id: "6",
    image: DonationThumbnail1,
    date: "Sept 1, 2023",
    title: "Lidu Land Drought",
    content:
      "The people of Tanah Lidu are currently suffering from drought, help them get clean water!",
    categoryName: "Pandemic",
    categoryId: "4",
    analytics: {
      count: 760,
    },
  },
];


export const storyCategoryData: IStoryCategory[] = [
    {
      id: "1",
      name: "Disaster",
    },
    {
      id: "2",
      name: "Children",
    },
    {
      id: "3",
      name: "Health",
    },
    {
      id: "4",
      name: "Pandemic",
    },
    {
      id: "5",
      name: "Food Crises",
    },
    {
      id: "6",
      name: "Education",
    },
    {
      id: "7",
      name: "Homeless",
    },
    {
      id: "8",
      name: "Animal",
    },
    {
      id: "9",
      name: "War Crises",
    },
  ];
  
