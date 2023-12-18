import { IStory, IStoryCategory } from "@/types/IStory";
import DonationThumbnail1 from "@/assets/donate-thumbnail-1.jpg";
import DonationThumbnail2 from "@/assets/donate-thumbnail-2.jpg";
import DonationThumbnail3 from "@/assets/donate-thumbnail-3.jpg";
import SupportUsThumbnail1 from "@/assets/supportus-thumbnail-1.png";
import SupportUsThumbnail2 from "@/assets/supportus-thumbnail-2.png";
import SupportUsThumbnail3 from "@/assets/supportus-thumbnail-3.png";
import SupportUsThumbnail4 from "@/assets/supportus-thumbnail-4.png";
import SupportUsThumbnail5 from "@/assets/supportus-thumbnail-5.png";
import SupportUsThumbnail6 from "@/assets/supportus-thumbnail-6.png";


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

export const storyBlogData: IStory[] = [
  {
    id: "1",
    image: {
      src: SupportUsThumbnail1,
      col: 2,
      row: 4,
    },
    title:
      "Land of Hope Foundation Land of Hope Foundation Land of Hope Foundation Land of Hope Foundation",
    content: (
      <div>
        <p>
          Land of Hope Foundation Land of Hope Foundation Land of Hope
          Foundation Land of Hope Foundation Land of Hope Foundation Land of
          Hope Foundation Land of Hope Foundation Land of Hope Foundation
        </p>
        <br />
        <p>
          Land of Hope Foundation Land of Hope Foundation Land of Hope
          Foundation Land of Hope Foundation Land of Hope Foundation Land of
          Hope Foundation Land of Hope Foundation Land of Hope Foundation
        </p>
      </div>
    ),
    comments: 30,
    likes: 12,
    shares: 2,
    url: "/blog",
  },
  {
    id: "2",
    image: {
      src: SupportUsThumbnail2,
      col: 2,
      row: 2,
    },
    title: "Yinka Shonibare Foundation",
    content:
      "The Land of Hope was founded to fight against the idea that children are witches in Nigeria to be tortured or killed. The Land of Hope was founded to fight against the idea that children are witches in Nigeria to be tortured or killed.",
    comments: 30,
    likes: 12,
    shares: 2,
    url: "/blog",
  },
  {
    id: "3",
    image: {
      src: SupportUsThumbnail3,
      col: 2,
      row: 2,
    },
    title: "Yinka Shonibare Foundation",
    content:
      "Founded to encourage cultural interchange through residencies and development programmes in the UK and Nigeria.",
    comments: 30,
    likes: 12,
    shares: 2,
    url: "/blog",
  },
  {
    id: "4",
    image: {
      src: SupportUsThumbnail4,
      col: 2,
      row: 4,
    },
    title: "The GEANCO Foundation",
    content:
      "We organize special surgical missions and run an innovative, life-saving program to fight anemia in Nigeria.",
    comments: 30,
    likes: 12,
    shares: 2,
    url: "/blog",
  },
  {
    id: "5",
    image: {
      src: SupportUsThumbnail5,
      row: 4,
    },
    title: "Chess in slum Africa",
    content:
      "A non-profit organization using the game of chess to help youngsters in slum communities realize their full potential.",
    comments: 30,
    likes: 12,
    shares: 2,
    url: "/blog",
  },
  {
    id: "6",
    image: {
      src: SupportUsThumbnail6,
    },
    title: "Lagos Food Bank Initiative",
    content:
      "The Lagos Food Bank Initiative provides low-income communities across Nigeria with basic food and self-care items.",
    comments: 30,
    likes: 12,
    shares: 2,
    url: "/blog",
  },
  {
    id: "7",
    image: {
      src: SupportUsThumbnail1,
    },
    title: "Yinka Shonibare Foundation",
    content:
      "Founded to encourage cultural interchange through residencies and development programmes in the UK and Nigeria.",
    comments: 30,
    likes: 12,
    shares: 2,
    url: "/blog",
  },
  {
    id: "8",
    image: {
      src: SupportUsThumbnail2,
    },
    title: "Yinka Shonibare Foundation",
    content:
      "Founded to encourage cultural interchange through residencies and development programmes in the UK and Nigeria.",
    comments: 30,
    likes: 12,
    shares: 2,
    url: "/blog",
  },
  {
    id: "9",
    image: {
      src: SupportUsThumbnail3,
    },
    title: "Yinka Shonibare Foundation",
    content:
      "Founded to encourage cultural interchange through residencies and development programmes in the UK and Nigeria.",
    comments: 30,
    likes: 12,
    shares: 2,
    url: "/blog",
  },
];

// export const storyImageData:IStory[] = [
//   {
//     id:"1",
//     title:""
//   }
// ]
