import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { LearningResourcesService } from '../src/learning-resources/learning-resources.service';
import { CppProblemsService } from '../src/cpp-problems/cpp-problems.service';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

/**
 * Script to:
 * 1. Clean up tlelevel3courses collection (delete all documents)
 * 2. Generate sample data for cppproblems collection
 */

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const learningResourcesService = app.get(LearningResourcesService);
  const cppProblemsService = app.get(CppProblemsService);
  const connection = app.get<Connection>(getConnectionToken());

  console.log('Starting cleanup and seeding...\n');

  try {
    // 1. Clean up tlelevel3courses collection
    console.log('1. Cleaning up tlelevel3courses collection...');
    const tleModel = (learningResourcesService as any).tleLevel3CourseModel;
    const deleteResult = await tleModel.deleteMany({});
    console.log(`  ✓ Deleted ${deleteResult.deletedCount} documents from tlelevel3courses\n`);

    // 2. Generate sample data for cppproblems
    console.log('2. Generating sample data for cppproblems...');
    
    const sampleProblems = [
      {
        id: 'cpp-001',
        title: 'Two Sum',
        category: 'Array',
        difficulty: 'Easy' as const,
        notes: 'Use hash map to store complement values. Time complexity: O(n), Space: O(n)',
        code: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};`,
        imageUrl: 'https://example.com/two-sum.png',
      },
      {
        id: 'cpp-002',
        title: 'Reverse Linked List',
        category: 'Linked List',
        difficulty: 'Easy' as const,
        notes: 'Iterative approach: maintain prev, curr, next pointers. Recursive approach also possible.',
        code: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        
        while (curr != nullptr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        
        return prev;
    }
};`,
      },
      {
        id: 'cpp-003',
        title: 'Merge Two Sorted Lists',
        category: 'Linked List',
        difficulty: 'Easy' as const,
        notes: 'Use dummy node to simplify edge cases. Compare and merge nodes.',
        code: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        
        while (list1 && list2) {
            if (list1->val < list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        
        tail->next = list1 ? list1 : list2;
        return dummy.next;
    }
};`,
      },
      {
        id: 'cpp-004',
        title: 'Best Time to Buy and Sell Stock',
        category: 'Array',
        difficulty: 'Easy' as const,
        notes: 'Track minimum price seen so far and maximum profit. One pass solution.',
        code: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;
        int maxProfit = 0;
        
        for (int price : prices) {
            minPrice = min(minPrice, price);
            maxProfit = max(maxProfit, price - minPrice);
        }
        
        return maxProfit;
    }
};`,
      },
      {
        id: 'cpp-005',
        title: 'Valid Parentheses',
        category: 'Stack',
        difficulty: 'Easy' as const,
        notes: 'Use stack to match opening and closing brackets. Check stack is empty at end.',
        code: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> mapping = {
            {')', '('},
            {'}', '{'},
            {']', '['}
        };
        
        for (char c : s) {
            if (mapping.find(c) != mapping.end()) {
                if (st.empty() || st.top() != mapping[c]) {
                    return false;
                }
                st.pop();
            } else {
                st.push(c);
            }
        }
        
        return st.empty();
    }
};`,
      },
      {
        id: 'cpp-006',
        title: 'Longest Substring Without Repeating Characters',
        category: 'String',
        difficulty: 'Medium' as const,
        notes: 'Sliding window technique. Use hash map to track character positions.',
        code: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> map;
        int maxLen = 0;
        int start = 0;
        
        for (int end = 0; end < s.length(); end++) {
            if (map.find(s[end]) != map.end() && map[s[end]] >= start) {
                start = map[s[end]] + 1;
            }
            map[s[end]] = end;
            maxLen = max(maxLen, end - start + 1);
        }
        
        return maxLen;
    }
};`,
      },
      {
        id: 'cpp-007',
        title: 'Container With Most Water',
        category: 'Array',
        difficulty: 'Medium' as const,
        notes: 'Two pointer approach. Move pointer with smaller height. Greedy algorithm.',
        code: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0;
        int right = height.size() - 1;
        int maxArea = 0;
        
        while (left < right) {
            int area = min(height[left], height[right]) * (right - left);
            maxArea = max(maxArea, area);
            
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxArea;
    }
};`,
      },
      {
        id: 'cpp-008',
        title: '3Sum',
        category: 'Array',
        difficulty: 'Medium' as const,
        notes: 'Sort array first. Fix one element, use two pointers for remaining. Skip duplicates.',
        code: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> result;
        
        for (int i = 0; i < nums.size() - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            
            int left = i + 1;
            int right = nums.size() - 1;
            
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    result.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left+1]) left++;
                    while (left < right && nums[right] == nums[right-1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        
        return result;
    }
};`,
      },
      {
        id: 'cpp-009',
        title: 'Binary Tree Maximum Path Sum',
        category: 'Tree',
        difficulty: 'Hard' as const,
        notes: 'DFS approach. For each node, calculate max path through it. Update global max.',
        code: `class Solution {
private:
    int maxSum = INT_MIN;
    
    int dfs(TreeNode* root) {
        if (!root) return 0;
        
        int left = max(0, dfs(root->left));
        int right = max(0, dfs(root->right));
        
        maxSum = max(maxSum, root->val + left + right);
        
        return root->val + max(left, right);
    }
    
public:
    int maxPathSum(TreeNode* root) {
        dfs(root);
        return maxSum;
    }
};`,
      },
      {
        id: 'cpp-010',
        title: 'Merge k Sorted Lists',
        category: 'Linked List',
        difficulty: 'Hard' as const,
        notes: 'Use priority queue (min heap) to always get smallest element. Divide and conquer also possible.',
        code: `class Solution {
public:
    struct Compare {
        bool operator()(ListNode* a, ListNode* b) {
            return a->val > b->val;
        }
    };
    
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, Compare> pq;
        
        for (ListNode* list : lists) {
            if (list) pq.push(list);
        }
        
        ListNode dummy(0);
        ListNode* tail = &dummy;
        
        while (!pq.empty()) {
            ListNode* node = pq.top();
            pq.pop();
            tail->next = node;
            tail = tail->next;
            if (node->next) pq.push(node->next);
        }
        
        return dummy.next;
    }
};`,
      },
    ];

    let createdCount = 0;
    for (const problem of sampleProblems) {
      try {
        await cppProblemsService.create(problem);
        createdCount++;
      } catch (error: any) {
        if (error.code === 11000) {
          console.log(`  ⚠ Skipping duplicate problem: ${problem.id}`);
        } else {
          console.log(`  ⚠ Error creating problem ${problem.id}: ${error.message}`);
        }
      }
    }
    console.log(`  ✓ Created ${createdCount} sample problems\n`);

    console.log('\n✅ Cleanup and seeding completed successfully!');
  } catch (error) {
    console.error('❌ Operation failed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();

