export const samplePosts = Array.from({ length: 45 }, (_, i) => {
  const day = ((i % 30) + 1).toString().padStart(2, "0"); // 01~30일
  const createdAt = `2025-11-${day}`;
  const updatedAt = `2025-11-${(((i + 2) % 30) + 1)
    .toString()
    .padStart(2, "0")}`; // 작성일 +1~2일로 임의 수정일
  const isPublic = i % 2 === 0; // 짝수 게시글 공개, 홀수 비공개

  return {
    id: i + 1,
    title: `게시글 제목 ${i + 1}`,
    content: `게시글 내용 ${i + 1}`,
    author: `작성자 ${i + 1}`,
    createdAt, // 작성일
    updatedAt, // 수정일
    isPublic, // 공개 여부 (true/false)
  };
});

export const romData = [
  {
    joint: "Shoulder",
    measurement: "Flexion",
    normal: "180°",
    gradeA: "144° 이상",
    gradeB: "90° ~ 144°",
    gradeC: "90° 미만",
  },
  {
    joint: "Shoulder",
    measurement: "Abduction",
    normal: "180°",
    gradeA: "144° 이상",
    gradeB: "90° ~ 144°",
    gradeC: "90° 미만",
  },
  {
    joint: "Elbow",
    measurement: "Flexion",
    normal: "150°",
    gradeA: "120° 이상",
    gradeB: "75° ~ 120°",
    gradeC: "75° 미만",
  },
  {
    joint: "Wrist",
    measurement: "Flexion",
    normal: "80°",
    gradeA: "64° 이상",
    gradeB: "40° ~ 64°",
    gradeC: "40° 미만",
  },
  {
    joint: "Wrist",
    measurement: "Extension",
    normal: "70°",
    gradeA: "56° 이상",
    gradeB: "35° ~ 56°",
    gradeC: "35° 미만",
  },
  {
    joint: "Hip",
    measurement: "Flexion",
    normal: "120°",
    gradeA: "96° 이상",
    gradeB: "60° ~ 96°",
    gradeC: "60° 미만",
  },
  {
    joint: "Knee",
    measurement: "Flexion",
    normal: "135°",
    gradeA: "108° 이상",
    gradeB: "68° ~ 108°",
    gradeC: "68° 미만",
  },
  {
    joint: "Ankle",
    measurement: "Dorsiflexion",
    normal: "20°",
    gradeA: "16° 이상",
    gradeB: "10° ~ 16°",
    gradeC: "10° 미만",
  },
];

export const romActivePassiveData = [
  {
    motion: "어깨 중립 벌림",
    rightActive: null,
    rightPassive: "165.7 ± 5.8",
    leftActive: null,
    leftPassive: "168.2 ± 18.9",
  },
  {
    motion: "어깨 중립 모음",
    rightActive: "48.8 ± 6.0",
    rightPassive: "52.5 ± 6.0",
    leftActive: "52.4 ± 4.7",
    leftPassive: "56.6 ± 7.0",
  },
  {
    motion: "어깨 안쪽 회전",
    rightActive: "95.5 ± 12.6",
    rightPassive: "102.2 ± 6.3",
    leftActive: "98.3 ± 9.4",
    leftPassive: "110.4 ± 5.8",
  },
  {
    motion: "어깨 바깥쪽 회전",
    rightActive: "65.9 ± 9.4",
    rightPassive: "71.5 ± 9.4",
    leftActive: "69.6 ± 6.3",
    leftPassive: "75.2 ± 9.4",
  },
  {
    motion: "견관절 벌림",
    rightActive: "82.7 ± 12.0",
    rightPassive: null,
    leftActive: "92.2 ± 6.2",
    leftPassive: null,
  },
  {
    motion: "견관절 수평 굴곡",
    rightActive: "116.7 ± 8.6",
    rightPassive: "121.3 ± 5.5",
    leftActive: "122.9 ± 8.4",
    leftPassive: "125.1 ± 6.5",
  },
  {
    motion: "견관절 수평 내회전",
    rightActive: "69.5 ± 8.6",
    rightPassive: "74.7 ± 8.6",
    leftActive: "72.2 ± 12.4",
    leftPassive: "78.8 ± 7.4",
  },
  {
    motion: "견관절 수평 신전",
    rightActive: "27.7 ± 11.0",
    rightPassive: null,
    leftActive: "30.7 ± 9.4",
    leftPassive: null,
  },
  {
    motion: "팔꿈치 굴곡",
    rightActive: "140.0 ± 5.6",
    rightPassive: "142.8 ± 8.4",
    leftActive: "142.4 ± 9.4",
    leftPassive: "145.6 ± 3.1",
  },
  {
    motion: "팔꿈치 신전",
    rightActive: "182.8 ± 5.1",
    rightPassive: "183.8 ± 11.9",
    leftActive: "184.5 ± 9.3",
    leftPassive: "186.0 ± 10.2",
  },
  {
    motion: "전완 회외",
    rightActive: "86.5 ± 8.3",
    rightPassive: "90.4 ± 12.0",
    leftActive: "88.2 ± 12.9",
    leftPassive: "93.0 ± 7.1",
  },
  {
    motion: "손목 신전",
    rightActive: "59.4 ± 6.2",
    rightPassive: "68.5 ± 10.2",
    leftActive: "69.0 ± 5.2",
    leftPassive: "78.4 ± 11.4",
  },
  {
    motion: "손목 요측 편차",
    rightActive: "17.6 ± 6.7",
    rightPassive: "18.6 ± 4.9",
    leftActive: "21.3 ± 4.0",
    leftPassive: "24.3 ± 5.1",
  },
];
