package com.jobPortal.profile_service.controller;

import com.jobPortal.profile_service.dto.ProfileRequestDto;
import com.jobPortal.profile_service.dto.ProfileResponseDto;
import com.jobPortal.profile_service.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private  final ProfileService profileService ;
    public ProfileController(ProfileService profileService){
        this.profileService = profileService ;
    }
    // 1. Create Profile
    @PostMapping
    public ResponseEntity<ProfileResponseDto> createProfile(
            @RequestParam Long userId,
            @RequestBody ProfileRequestDto request) {

        ProfileResponseDto response =
                profileService.createProfile(userId, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 2. Get Profile
    @GetMapping
    public ResponseEntity<ProfileResponseDto> getProfile(
            @RequestParam Long userId) {

        ProfileResponseDto response =
                profileService.getProfile(userId);

        return ResponseEntity.ok(response);
    }

    // 3. Update Profile
    @PutMapping
    public ResponseEntity<ProfileResponseDto> updateProfile(
            @RequestParam Long userId,
            @RequestBody ProfileRequestDto request) {

        ProfileResponseDto response =
                profileService.updateProfile(userId, request);

        return ResponseEntity.ok(response);
    }

    // 4. Delete Profile
    @DeleteMapping
    public ResponseEntity<String> deleteProfile(
            @RequestParam Long userId) {

        profileService.deleteProfile(userId);

        return ResponseEntity.ok("Profile deleted successfully");
    }
}
