タイトル: ローディング中のスケルトンUI実装

ラベル: 
- priority-p0
- type-enhancement
- type-ui

説明:
プランの生成中により良いユーザー体験を提供するため、ローディング中のスケルトンUIを実装する。

タスク:
- [x] 汎用的なSkeletonコンポーネントの作成
- [x] 旅行プラン用のTripSkeletonコンポーネントの実装
- [x] モーダル内でのスケルトンUI表示
- [x] ダークモード対応
- [x] レスポンシブ対応
- [x] アニメーション実装

影響範囲:
- src/components/atoms/Skeleton.tsx（新規作成）
- src/components/molecules/TripSkeleton.tsx（新規作成）
- src/components/atoms/Modal.tsx（修正）
- src/app/page.tsx（修正）

技術的な考慮事項:
- TailwindCSSのアニメーション機能の活用
- Atomic Designに基づいたコンポーネント設計
- TypeScriptの型安全性の確保
- パフォーマンスへの影響の最小化
