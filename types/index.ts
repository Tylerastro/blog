/**
 * Central export file for all type definitions
 * Import types from here to maintain consistency across the application
 */

// Page-related types
export type {
  Language,
  BasePageProps,
  HomeProps,
  AboutMeProps,
  BlogPostsListProps,
  BlogPostPageProps,
  ProjectsPageProps,
  TagCloudPageProps,
  TagSlugPageProps,
} from "./pages";

// Post and content types
export type {
  BlogPost,
  PostMetadata,
  TOCItem,
  GroupedPosts,
  Publication,
  TagInfo,
} from "./posts";

// Project types
export type {
  Project,
  TechBadgeInfo,
} from "./projects";

// Component prop types
export type {
  NavBarProps,
  BlogLink,
  PostListProps,
  PostDrawerProps,
  PostInfoProps,
  TimelineProps,
  TableOfContentsProps,
  TagBadgeProps,
  TechBadgeProps,
  CodeBlockProps,
  MediumBlockquoteProps,
  AudioPlayerProps,
  ScrollRevealProps,
  TextRotationProps,
  AnimatedButtonProps,
  BackToTopProps,
  ListItem,
  TabContentProps,
} from "./components";

// UI and interaction types
export type {
  Message,
  ChatInterfaceProps,
  ToasterToast,
  ToastState,
  ToastActionType,
  Toast,
  SheetContentProps,
  ToastProps,
  ToastActionElement,
  FormField,
  ContactFormData,
} from "./ui";

// Graphics and 3D types
export type {
  UniformValue,
  ExtendMaterialConfig,
  ShaderWithDefines,
  Scene3DProps,
  BlackHoleProps,
  BeamsProps,
  CanvasStrokeStyle,
  GridOffset,
  SquaresProps,
  VisualEffectProps,
  ShaderUniforms,
} from "./graphics";

// Common utility types
export type {
  StringOrNumber,
  Optional,
  Nullable,
  SizeVariant,
  ColorVariant,
  ComponentVariant,
  Direction,
  Position,
  BaseComponentProps,
  BaseInteractiveProps,
  GenericProps,
  AsyncState,
  PaginationInfo,
  SearchParams,
  SortOptions,
  LinkInfo,
  PageMetadata,
} from "./common";