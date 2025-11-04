<?php

namespace Tests\Feature;

use App\Models\ABTest;
use App\Models\ABTestAssignment;
use App\Models\ABTestEvent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ABTestingTest extends TestCase
{
    use RefreshDatabase;

    public function test_ab_test_assignment_creation()
    {
        // Create a test
        $test = ABTest::create([
            'name' => 'Homepage Hero Test',
            'description' => 'Testing different hero messages',
            'status' => 'active',
            'start_date' => now(),
            'variants' => ['control', 'variant-a', 'variant-b'],
        ]);

        // Test assignment endpoint
        $response = $this->get("/api/ab-tests/{$test->id}");
        
        $response->assertStatus(200);
        
        $data = $response->json();
        $this->assertEquals($test->id, $data['test']['id']);
        $this->assertContains($data['variant'], ['control', 'variant-a', 'variant-b']);
        $this->assertNotEmpty($data['session_id']);
        
        // Verify assignment was created in database
        $this->assertDatabaseHas('a_b_test_assignments', [
            'a_b_test_id' => $test->id,
            'session_id' => $data['session_id'],
            'variant' => $data['variant'],
        ]);
    }

    public function test_ab_test_assignment_by_name()
    {
        // Create a test
        $test = ABTest::create([
            'name' => 'contact-cta',
            'description' => 'Testing CTA buttons',
            'status' => 'active',
            'start_date' => now(),
            'variants' => ['control', 'variant-a'],
        ]);

        // Test assignment by name
        $response = $this->get("/api/ab-tests/{$test->name}");
        
        $response->assertStatus(200);
        
        $data = $response->json();
        $this->assertEquals($test->id, $data['test']['id']);
        $this->assertEquals($test->name, $data['test']['name']);
    }

    public function test_ab_test_event_tracking()
    {
        // Create a test and assignment
        $test = ABTest::create([
            'name' => 'Homepage Hero Test',
            'description' => 'Testing different hero messages',
            'status' => 'active',
            'start_date' => now(),
            'variants' => ['control', 'variant-a'],
        ]);

        $assignment = ABTestAssignment::create([
            'a_b_test_id' => $test->id,
            'session_id' => 'test-session-123',
            'variant' => 'control',
        ]);

        // Track a conversion event
        $response = $this->post('/api/ab-test-events', [
            'test_id' => $test->id,
            'session_id' => 'test-session-123',
            'event_type' => 'conversion',
            'event_data' => ['button' => 'cta-clicked'],
        ]);

        $response->assertStatus(201);

        // Verify event was tracked
        $this->assertDatabaseHas('a_b_test_events', [
            'a_b_test_assignment_id' => $assignment->id,
            'event_type' => 'conversion',
        ]);
    }

    public function test_ab_test_metrics_endpoint()
    {
        // Create a test with some data
        $test = ABTest::create([
            'name' => 'Homepage Hero Test',
            'description' => 'Testing different hero messages',
            'status' => 'active',
            'start_date' => now(),
            'variants' => ['control', 'variant-a'],
        ]);

        // Create some assignments
        $controlAssignment = ABTestAssignment::create([
            'a_b_test_id' => $test->id,
            'session_id' => 'session-1',
            'variant' => 'control',
        ]);

        $variantAssignment = ABTestAssignment::create([
            'a_b_test_id' => $test->id,
            'session_id' => 'session-2',
            'variant' => 'variant-a',
        ]);

        // Create a conversion event
        ABTestEvent::create([
            'a_b_test_assignment_id' => $controlAssignment->id,
            'event_type' => 'conversion',
            'event_data' => [],
        ]);

        // Test metrics endpoint
        $response = $this->get('/api/ab-tests');
        
        $response->assertStatus(200);
        
        $data = $response->json();
        $this->assertIsArray($data);
        $this->assertCount(1, $data);
        
        $testData = $data[0];
        $this->assertEquals($test->id, $testData['id']);
        $this->assertEquals(2, $testData['total_assignments']);
        $this->assertEquals(1, $testData['total_conversions']);
        $this->assertIsArray($testData['variants']);
        $this->assertCount(2, $testData['variants']);
    }

    public function test_demo_page_renders()
    {
        $response = $this->get('/ab-test-demo');
        $response->assertStatus(200);
    }

    public function test_analytics_page_renders()
    {
        $response = $this->get('/ab-test-analytics');
        $response->assertStatus(200);
    }

    public function test_inactive_ab_test_not_assigned()
    {
        // Create an inactive test
        $test = ABTest::create([
            'name' => 'Inactive Test',
            'description' => 'This test is not active',
            'status' => 'draft',
            'start_date' => now(),
            'variants' => ['control', 'variant-a'],
        ]);

        // Test assignment endpoint
        $response = $this->get("/api/ab-tests/{$test->id}");
        
        $response->assertStatus(404);
    }

    public function test_deterministic_variant_assignment()
    {
        // Create a test
        $test = ABTest::create([
            'name' => 'Deterministic Test',
            'description' => 'Testing deterministic assignment',
            'status' => 'active',
            'start_date' => now(),
            'variants' => ['control', 'variant-a'],
        ]);

        $sessionId = 'consistent-session-id';

        // Make multiple requests with the same session
        $response1 = $this->withSession(['ab_test_session_id' => $sessionId])
                          ->get("/api/ab-tests/{$test->id}");
        
        $response2 = $this->withSession(['ab_test_session_id' => $sessionId])
                          ->get("/api/ab-tests/{$test->id}");

        $response1->assertStatus(200);
        $response2->assertStatus(200);

        $data1 = $response1->json();
        $data2 = $response2->json();

        // Should get the same variant for the same session
        $this->assertEquals($data1['variant'], $data2['variant']);
        $this->assertEquals($data1['session_id'], $data2['session_id']);
    }
}